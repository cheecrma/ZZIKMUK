import os

# api key 연결 - 숨겨놓기
def connect():
    directory_path = os.path.dirname(__file__)
    file_path = os.path.join(directory_path, 'zzikmuk-c0316ac26f9d.json')
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = file_path
    print('service key connect')


