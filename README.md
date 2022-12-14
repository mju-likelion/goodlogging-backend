# goodlogging_backend

순서 | 목차 
| --- | ---
| 0 | 프로젝트 링크
| 1 | 프로젝트 구조 
| 2 | 실행 방법 
| 3 | 브랜치 규칙
| 4 | 커밋 컨벤션
| 5 | 폴더 구조
| 6 | API 문서
| 7 | DB 스키마
* * *

## 프로젝트 링크
👉 &nbsp; [프로젝트 링크](https://www.goodlogging.p-e.kr)

* * *

## 🔎 프로젝트 구조
![프로젝트 구조](https://user-images.githubusercontent.com/90085154/184902216-523b7956-348e-4065-a6bf-8c7b43183383.png)

* * *

## 실행 방법
⬇️ 아래 명시한 패키지들을 ```yarn install```로 받으신 다음 ```yarn start```로 실행하시면 됩니다
### 📚 사용한 스택 & 프레임워크
* javaScript
* node.js
* mySQL
* amazon RDS
* amazon EC2
* pm2
### 📦 사용한 yarn 패키지들
#### dependencies
* bcrypt
* date-fns
* dotenv
* express
* express-validator
* http-status
* jsonwebtoken
* mysql2
* sequelize
* sequelize-cli
* aws-sdk
* cors
* multer
* multer-s3
* pm2
#### devDependencies
* @babel/core
* @babel/node
* @babel/preset-env
* eslint
* eslint-config-airbnb-base
* eslint-config-prettier
* eslint-plugin-import
* eslint-plugin-prettier
* nodemon
### .env 관련 정보
```
USERNAME="...."
PASSWORD="...."
DATABASE="...."
HOST="...."
JWT_SECRET="...."
AWS_ACCESS_KEY="...."
AWS_SECRET_KEY="...."
S3_BUCKET_NAME="...."
DEFAULT_LOCATION="...."
```
* * *

## 브랜치 규칙
* main: setting, document 등의 커밋을 할 때는 main 브랜치에 바로 작업
* feat/기능: 모델이 필요한 작업을 할 때는 feat/기능 브랜치를 만들어 작업
* merge 방식은 항상 기본 merge 방식으로 진행하고, merge를 하고 난 다음에는 해당 브랜치를 삭제한다.
* * * 

## 커밋 컨벤션
작성 | 설명 | 브랜치
| --- | --- | ---
| ```feat: 내용``` | 기능 추가 | feat/기능
| ```fix: 내용``` | 버그 및 오류 수정 | feat/기능
| ```refactoring: 내용``` | 리팩터링 (기능 그대로 + 코드 수정) | feat/기능
| ```setting: 내용``` | 패키지 설치 등의 작업 | main
| ```document: 내용``` | 리드미 변경, 주석 추가 삭제 등 | main
* * *

## 폴더 구조
```bash
├── 📂 config
│   ├── 📜 config.json
│   ├── 📜 multer.config.js
│   └── 📜 s3.config.js
├── 📂 models
│   ├── 📜 Badge.js
│   ├── 📜 Challenge.js
│   ├── 📜 File.js
│   ├── 📜 index.js
│   ├── 📜 Plogging.js
│   ├── 📜 Trash.js
│   └── 📜 User.js
├── 📦 node_modules
│   └── 📂 .....
├── 📂 src
│   ├── 📂 controllers
│   │   ├── 📜 authController.js
│   │   ├── 📜 badgeController.js
│   │   ├── 📜 boardController.js
│   │   ├── 📜 challengeController.js
│   │   ├── 📜 feedController.js
│   │   ├── 📜 hashtagController.js
│   │   ├── 📜 mainController.js
│   │   ├── 📜 ploggingController.js
│   │   ├── 📜 trashController.js
│   │   ├── 📜 uploadController.js
│   │   └── 📜 userController.js
│   ├── 📂 errors
│   │   ├── 📜 apierror.js
│   │   ├── 📜 error.js
│   │   └── 📜 wrapper.js
│   ├── 📂 functions
│   │   ├── 📜 calculateLevel.js
│   │   ├── 📜 getFileUrl.js
│   │   ├── 📜 giveBadge.js
│   │   ├── 📜 password.js
│   │   ├── 📜 uploadImage.js
│   │   └── 📜 userSort.js
│   ├── 📂 middlewares
│   │   ├── 📜 authValidate.js
│   │   ├── 📜 checkChallenge.js
│   │   └── 📜 param.validate.js
│   ├── 📂 routers
│   │   ├── 📜 authRouter.js
│   │   ├── 📜 badgeRouter.js
│   │   ├── 📜 boardRouter.js
│   │   ├── 📜 challengeRouter.js
│   │   ├── 📜 feedRouter.js
│   │   ├── 📜 hashtagRouter.js
│   │   ├── 📜 index.js
│   │   ├── 📜 logRouter.js
│   │   ├── 📜 mainRouter.js
│   │   ├── 📜 ploggingRouter.js
│   │   ├── 📜 trashRouter.js
│   │   ├── 📜 uploadRouter.js
│   │   └── 📜 userRouter.js
│   └── 📜 index.js
├── 📜 .babelrc
├── 📜 .env
├── 📜 .eslintrc.json
├── 📜 .gitignore
├── 📜 .prettierrc.json
├── 📜 appspec.yml
├── 📜 package.json
├── 📜 README.md
├── 📜 start.sh
├── 📜 stop.sh
└── 📜 yarn.lock
``` 
* * *

## API 문서
* [API 문서](https://burnt-dahlia-f9e.notion.site/API-fef523bc86db48fd9515d1feeddf5517)

* * *

## DB 스키마
* [DB 스키마](https://burnt-dahlia-f9e.notion.site/DB-308d3a8941ff4320b33e7bc6deb496d3)
