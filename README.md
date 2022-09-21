# :sparkles: 찍먹: 찍어먹는 레시피 :fork_and_knife:

##### SSAFY 7기 특화 프로젝트

> 재료를 바탕으로 레시피를 추천하는 Application

<br>

### :crown: Team A102

팀장: 임수환

팀원: 강승리, 권수린, 성지훈, 신재은



<br>

---

### 실행방법

1. venv 가상환경 생성: venv 폴더 만들어짐
   `python -m venv venv`
   +) backend 폴더 안에서 생성! `cd backend`
2. venv 가상환경 실행: tab키로 자동완성 가능
   `source venv/Scripts/activate`
3. 터미널에 (venv)로 가상환경 진입된 것 확인
4. 기본 라이브러리 install: requirements.txt 활용(버전까지 지정됨)
   `pip install -r requirements.txt`
5. AI(GCP)를 사용하기 위한 설정
   1. GCP용 service key를 호출
      service.py & key.json이 있는 key 폴더를 receipts 안에 복사
   2. GCP-vision 다운로드
      `pip install --upgrade google-cloud-vision`
6. 프로젝트 실행
   `python manage.py runserver`
   +) 파일 실행
   `python (실행파일.py)`

<br>

### application 생성

1. 원하는 앱 이름으로 코드 실행
   `python manage.py startapp (app 이름)`
2. urls, templates(필요시) 따로 생성
   `app_name = '(app 이름)'`: 양식은 recipes/apps.py 참고

<br>

### 폴더 구조

#### :heart: frontend

.



#### :blue_heart: backend

##### zzikmuk

- 프로젝트 이름
- 전체 프로젝트와 관련(app 만들때 urls.py에 추가해야함)

##### recipes

- 프로젝트 app1
- 레시피와 관련된 service(list, detail 등)

##### receipts

- 프로젝트 내부 app2
- 영수증 인식과 관련된 service(ocr 등)
