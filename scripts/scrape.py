import os
import json
from notion_client import Client
import traceback  # 引入 traceback 用于打印详细的错误信息

# 本地调试时候取消注释来加载本地环境变量
# from dotenv import load_dotenv
# dotenv_path = '.env'
# load_dotenv(dotenv_path)

notion = Client(auth=os.getenv("ACCESS_TOKEN"))
database_id = os.getenv("DATABASE_ID")

def process_data(pages):
    processed_data = []
    for item in pages['results']:
        properties = item['properties']
        name = properties['name']['title'][0]['text']['content'] if properties['name']['title'] else ''
        web = properties.get('web', {}).get('url', '')
        tags = [tag['name'] for tag in properties.get('tags', {}).get('multi_select', [])]
        brief_text_list = properties.get('brief', {}).get('rich_text', [])
        brief = brief_text_list[0].get('text', {}).get('content', '') if brief_text_list else ''
        
        # 对 state 的处理添加 None 检查
        state_prop = properties.get('state')
        if state_prop and 'select' in state_prop and state_prop['select']:
            state = state_prop['select'].get('name', '')
        else:
            state = ''

        processed_data.append({
            "name": name,
            "web": web,
            "tags": tags,
            "brief": brief,
            "state": state
        })
    return processed_data


def fetch_database(database_id):
    """从Notion数据库获取所有数据,并处理"""
    data = []
    has_more = True
    start_cursor = None
    while has_more:
        try:
            response = notion.databases.query(database_id=database_id, start_cursor=start_cursor)
            data.extend(process_data(response))
            has_more = response.get('has_more', False) # type: ignore
            start_cursor = response.get('next_cursor') # type: ignore
        except Exception as e:
            print("Failed to query database:", e)
            traceback.print_exc()
            break  # 出错时退出循环
    return data

def main():
    """主函数，获取数据并保存到文件"""
    try:
        data = fetch_database(database_id)
        # 过滤数据
        filtered_data = [item for item in data if item['name'] and item['state'] == '正常']
        # 保存到JSON文件
        with open('public/assets/data.json', 'w', encoding='utf-8') as f:
            json.dump(filtered_data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"An error occurred: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    main()
