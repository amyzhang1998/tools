import http from '../utils/http';

export interface WebsiteItem {
  id: string;
  name: string;
  url: string;
  logo: string;
}

export interface WebsiteGroup {
  id: string;
  name: string;
  items: WebsiteItem[];
}

export async function getWebsiteGroups(): Promise<WebsiteGroup[]> {
  const res = await http.get('/website/getAllGroup');
  return res.data;
}

export async function addWebsiteItem(item: WebsiteItem, groupId: string): Promise<void> {
  const res = await http.post('/website/addItem', {
    item,
    groupId
  });
  return res.data;
}
