import type { UserData, Profile, Repo, Search, Organization, Event, Owner } from '../../types';

const BASE_URL = 'https://api.github.com';

export async function searchUsers(query: string): Promise<Search> {
  const response = await fetch(`${BASE_URL}/search/users?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to search users');
  }
  return response.json();
}

export async function getUserProfile(username: string): Promise<Profile> {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }
  return response.json();
}

export async function getUserRepos(username: string): Promise<Repo[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`);
  if (!response.ok) {
    throw new Error('Failed to get user repos');
  }
  return response.json();
}

export async function getUserOrgs(username: string): Promise<Organization[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/orgs`);
  if (!response.ok) {
    throw new Error('Failed to get user organizations');
  }
  return response.json();
}

export async function getUserEvents(username: string): Promise<Event[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/events?per_page=5`);
  if (!response.ok) {
    throw new Error('Failed to get user events');
  }
  return response.json();
}

export async function getUserFollowers(username: string): Promise<Owner[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/followers?per_page=6`);
  if (!response.ok) {
    throw new Error('Failed to get user followers');
  }
  return response.json();
}


export async function getUserReadme(username: string): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/repos/${username}/${username}/readme`, {
      headers: {
        'Accept': 'application/vnd.github.raw'
      }
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to get user readme');
    }

    return response.text();
  } catch (error) {
    console.warn('Error fetching readme:', error);
    return null;
  }
}

export async function getAllDataFromGithub(username: string) {
  try {
    const data = await Promise.all([
      getUserProfile(username),
      getUserRepos(username),
      getUserOrgs(username),
      getUserEvents(username),
      getUserFollowers(username),
      getUserReadme(username)
    ]);

    const userDate: UserData = {
      profileData: data[0],
      reposData: data[1],
      orgsData: data[2],
      eventsData: data[3],
      followersData: data[4],
      readmeData: data[5]
    }

    return userDate

  } catch (e) {
    throw new Error('Failed to get whole data of user');
  }
}