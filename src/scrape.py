import os
import json
from dotenv import load_dotenv
# 指定.env文件的路径
dotenv_path = '.env'
# 加载.env文件中的环境变量
load_dotenv(dotenv_path)
from notion_client import Client
# 初始化Notion客户端
notion = Client(auth=os.environ["ACCESS_TOKEN"])
database_id = os.environ["DATABASE_ID"]
response = notion.databases.query(database_id=database_id)
def process_data(pages):
    processed_data = []
    for item in pages['results']:
        properties = item['properties']
        processed_data.append({
            "name": properties['name']['title'][0]['text']['content'],
            "name_en": properties['name_en']['rich_text'][0]['text']['content'] if properties['name_en']['rich_text'] else '',
            "web": properties['web']['url'],
            "tags": [tag['name'] for tag in properties['tags']['multi_select']],
            "tags_en": [tag['name'] for tag in properties['tags_en']['multi_select']],
            "brief": properties['brief']['rich_text'][0]['text']['content'] if properties['brief']['rich_text'] else '',
            "brief_en": properties['brief_en']['rich_text'][0]['text']['content'] if properties['brief_en']['rich_text'] else '',
            "state": properties['state']['select']['name'],
        })
    return processed_data
def fetch_database(database_id):
    """从Notion数据库获取所有数据,并处理"""
    data = []
    has_more = True
    start_cursor = None
    while has_more:
        response = notion.databases.query(
            database_id=database_id,
            start_cursor=start_cursor
        )
        data.extend(process_data(response))
        has_more = response['has_more'] # type: ignore
        start_cursor = response.get('next_cursor') # type: ignore

    return data
def main():
    """主函数，获取数据并保存到文件"""
    try:
        data = fetch_database(database_id)
        # 过滤数据
        filtered_data = [item for item in data if item['name'] != '' and item['state'] == '正常']
        # 保存到JSON文件
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(filtered_data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"An error occurred: {e}")
if __name__ == "__main__":
    main()