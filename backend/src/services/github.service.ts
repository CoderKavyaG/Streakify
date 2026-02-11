import { cacheService } from "./cache.service";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_SERVER_TOKEN = process.env.GITHUB_TOKEN;

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubContributionResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
      };
    } | null;
  };
  errors?: { message: string }[];
}

// GraphQL query to fetch contribution calendar
const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export class GitHubService {
  /**
   * Get the token to use - prefer user token, fallback to server token
   */
  private getToken(userToken?: string): string {
    if (userToken && userToken.trim().length > 0) {
      return userToken;
    }
    const serverToken = process.env.GITHUB_TOKEN;
    if (serverToken && serverToken.trim().length > 0) {
      return serverToken;
    }
    throw new Error("No GitHub token available (User token missing, Server token missing)");
  }

  /**
   * Fetch contribution calendar for a GitHub user
   * @param username - GitHub username
   * @param userToken - Optional user's GitHub access token (for private repo access)
   */
  async getContributions(username: string, userToken?: string, forceRefresh: boolean = false): Promise<ContributionDay[]> {
    try {
      const cacheKey = `contributions:${username}`;

      if (!forceRefresh) {
        const cachedData = cacheService.get<ContributionDay[]>(cacheKey);
        if (cachedData) {
          // console.log(`Cache Hit for ${username}`);
          return cachedData;
        }
      }

      const token = this.getToken(userToken);

      console.log(`GitHub Service: Fetching contributions for ${username} from GitHub...`);

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: { username },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`GitHub API error (${response.status}): ${errorText}`);
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as GitHubContributionResponse;

      if (data.errors) {
        console.error("GitHub GraphQL errors:", JSON.stringify(data.errors, null, 2));
        throw new Error(`GraphQL errors: ${data.errors.map(e => e.message).join(", ")}`);
      }

      if (!data.data.user) {
        throw new Error(`GitHub user '${username}' not found`);
      }

      // Flatten weeks into a single array of days
      const calendar = data.data.user.contributionsCollection.contributionCalendar;
      const allDays: ContributionDay[] = [];

      for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
          allDays.push({
            date: day.date,
            contributionCount: day.contributionCount,
          });
        }
      }

      // Cache the result
      cacheService.set(cacheKey, allDays);

      return allDays;
    } catch (error) {
      console.error("Error fetching GitHub contributions:", error);
      throw error;
    }
  }

  /**
   * Get total contributions for the year
   */
  async getTotalContributions(username: string, userToken?: string): Promise<number> {
    try {
      const token = this.getToken(userToken);

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: { username },
        }),
      });

      const data = (await response.json()) as GitHubContributionResponse;

      if (!data.data.user) {
        return 0;
      }

      return data.data.user.contributionsCollection.contributionCalendar.totalContributions;
    } catch (error) {
      console.error("Error fetching total contributions:", error);
      return 0;
    }
  }

  /**
   * Check if user has contributed today in their timezone
   */
  async hasContributedToday(username: string, userToken?: string, timezone: string = "Asia/Kolkata"): Promise<boolean> {
    const contributions = await this.getContributions(username, userToken);

    // Get today's date in user's timezone
    const today = new Date().toLocaleDateString("en-CA", { timeZone: timezone }); // YYYY-MM-DD

    const todayContribution = contributions.find(day => day.date === today);
    return todayContribution ? todayContribution.contributionCount > 0 : false;
  }

  /**
   * Validate if a GitHub token is still valid
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const githubService = new GitHubService();
