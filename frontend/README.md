# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

```
frontend
├─ .gitignore
├─ .prettierrc
├─ config
│  ├─ env.js
│  ├─ getHttpsConfig.js
│  ├─ jest
│  │  ├─ babelTransform.js
│  │  ├─ cssTransform.js
│  │  └─ fileTransform.js
│  ├─ modules.js
│  ├─ paths.js
│  ├─ webpack
│  │  └─ persistentCache
│  │     └─ createEnvironmentHash.js
│  ├─ webpack.config.js
│  └─ webpackDevServer.config.js
├─ dockerfile
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ features
│  │  ├─ auth
│  │  │  ├─ authSagas.tsx
│  │  │  └─ authSlice.tsx
│  │  ├─ counter
│  │  │  ├─ counter-slice.ts
│  │  │  └─ counterSagas.ts
│  │  ├─ dashboard
│  │  │  ├─ dashboard-slice.tsx
│  │  │  └─ dashboardSaga.tsx
│  │  ├─ guild
│  │  │  ├─ guild-slice.tsx
│  │  │  └─ guildSaga.tsx
│  │  ├─ Read
│  │  │  ├─ read-slice.ts
│  │  │  └─ readSaga.ts
│  │  ├─ rootReducer.ts
│  │  ├─ rootSaga.ts
│  │  ├─ store.ts
│  │  ├─ study
│  │  │  ├─ study-slice.ts
│  │  │  └─ studySaga.ts
│  │  ├─ video
│  │  │  ├─ video-slice.ts
│  │  │  └─ videoSaga.ts
│  │  └─ writing
│  │     ├─ writing-slice.ts
│  │     └─ writingSaga.ts
│  ├─ fonts
│  │  ├─ fredoka-one-v13-latin-regular.woff
│  │  ├─ NanumSquareRoundR.woff
│  │  ├─ NotoSansKR-Regular.woff
│  │  ├─ Pretendard-Bold.otf
│  │  ├─ Pretendard-ExtraBold.otf
│  │  ├─ Pretendard-Light.otf
│  │  └─ Pretendard-Regular.otf
│  ├─ index.css
│  ├─ index.tsx
│  ├─ layout
│  │  ├─ Header.tsx
│  │  ├─ MainHeader.tsx
│  │  ├─ MainLayout.tsx
│  │  ├─ PageNotFound.tsx
│  │  ├─ SideBar.tsx
│  │  └─ StudyLayout.tsx
│  ├─ media
│  │  └─ images
│  │     └─ 404image.gif
│  ├─ models
│  │  ├─ common.ts
│  │  ├─ dashboard.ts
│  │  ├─ guild.ts
│  │  ├─ index.ts
│  │  ├─ read.ts
│  │  ├─ study.ts
│  │  ├─ user.ts
│  │  ├─ video.ts
│  │  └─ write.ts
│  ├─ pages
│  │  ├─ Dashboard
│  │  │  ├─ CustomSetting
│  │  │  │  └─ CustomSetting.tsx
│  │  │  ├─ DailyBoard
│  │  │  │  ├─ Calendar.tsx
│  │  │  │  ├─ CalendarHeader.tsx
│  │  │  │  ├─ DailyBoard.tsx
│  │  │  │  ├─ DailyStudyGraph.tsx
│  │  │  │  ├─ DashboardVideoCard.tsx
│  │  │  │  ├─ DashboardVideos.tsx
│  │  │  │  ├─ DateIndicator.tsx
│  │  │  │  ├─ GraphContainer.tsx
│  │  │  │  ├─ HistoryCounter.tsx
│  │  │  │  ├─ MonthIndicator.tsx
│  │  │  │  ├─ StudyHistoryContainer.tsx
│  │  │  │  ├─ VideoContainer.tsx
│  │  │  │  └─ WeekdayIndicator.tsx
│  │  │  ├─ DashBoardPage.tsx
│  │  │  ├─ HistoryBoard
│  │  │  │  └─ HistoryBoard.tsx
│  │  │  ├─ Profile
│  │  │  │  ├─ ModifyPassword.tsx
│  │  │  │  ├─ ModifyUserInfo.tsx
│  │  │  │  ├─ Profile.tsx
│  │  │  │  ├─ ProfileInputField.tsx
│  │  │  │  ├─ ProfileRadioField.tsx
│  │  │  │  ├─ SelectProfile.tsx
│  │  │  │  ├─ UpdateProfile.tsx
│  │  │  │  ├─ UpdateTagModal.tsx
│  │  │  │  └─ UpdateUserInfo.tsx
│  │  │  └─ Statistics
│  │  │     └─ Statistics.tsx
│  │  ├─ Guild
│  │  │  ├─ components
│  │  │  │  ├─ AddGuildVideoModal.tsx
│  │  │  │  └─ datePicker.css
│  │  │  ├─ EOZ
│  │  │  │  ├─ components
│  │  │  │  │  ├─ EnglishOnlyZone.tsx
│  │  │  │  │  ├─ EozModal.tsx
│  │  │  │  │  ├─ EozRoom.tsx
│  │  │  │  │  ├─ EozRoomInfo.tsx
│  │  │  │  │  ├─ MembersList.tsx
│  │  │  │  │  ├─ StreamVideo.tsx
│  │  │  │  │  ├─ TodayVideo.tsx
│  │  │  │  │  └─ UserEssayBtn.tsx
│  │  │  │  ├─ EnglishOnlyZone.tsx
│  │  │  │  ├─ EozPage.tsx
│  │  │  │  └─ ZonePage.tsx
│  │  │  ├─ GuildMainPage.tsx
│  │  │  ├─ GuildPage.tsx
│  │  │  ├─ MasterSettingPage.tsx
│  │  │  └─ MyGuildPage.tsx
│  │  ├─ Main
│  │  │  ├─ components
│  │  │  │  ├─ GuildNoticeModal.tsx
│  │  │  │  ├─ Modal.tsx
│  │  │  │  ├─ RecentVideo.tsx
│  │  │  │  ├─ RecommendVideoList.tsx
│  │  │  │  ├─ SearchBar.tsx
│  │  │  │  ├─ TagSelectModal.tsx
│  │  │  │  ├─ VideoCard.tsx
│  │  │  │  └─ VideoDataModal.tsx
│  │  │  └─ MainPage.tsx
│  │  ├─ private
│  │  │  ├─ ProtectedLoginRoute.tsx
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ Study
│  │  │  ├─ Read
│  │  │  │  ├─ components
│  │  │  │  │  ├─ CircularNavComp.tsx
│  │  │  │  │  ├─ DictionaryComp.tsx
│  │  │  │  │  ├─ ScriptComp.tsx
│  │  │  │  │  └─ VideoComp.tsx
│  │  │  │  └─ ReadPage.tsx
│  │  │  ├─ Speaking
│  │  │  │  ├─ components
│  │  │  │  │  ├─ EssayScript.tsx
│  │  │  │  │  ├─ ModeBtnContainer.tsx
│  │  │  │  │  ├─ ModeScreen.tsx
│  │  │  │  │  ├─ ScoreIndicator.tsx
│  │  │  │  │  ├─ SpeakingScreen.tsx
│  │  │  │  │  ├─ SpeechTest.tsx
│  │  │  │  │  ├─ VoiceRecorder.tsx
│  │  │  │  │  ├─ VoiceRecorderForTest.tsx
│  │  │  │  │  └─ WebCam.tsx
│  │  │  │  ├─ SpeakingPage.tsx
│  │  │  │  └─ UseOnScreen.tsx
│  │  │  ├─ Survey.tsx
│  │  │  ├─ Voca
│  │  │  │  └─ VocaPage.tsx
│  │  │  └─ Writing
│  │  │     ├─ components
│  │  │     │  ├─ HighlightTextAreaComp.tsx
│  │  │     │  ├─ TypoCorrectionComp.tsx
│  │  │     │  ├─ WordBookComp.tsx
│  │  │     │  ├─ WordListAndWritingContainer.tsx
│  │  │     │  └─ WritingCircularNavComp.tsx
│  │  │     └─ WritingPage.tsx
│  │  ├─ User
│  │  │  ├─ Auth
│  │  │  │  └─ AuthPage.tsx
│  │  │  ├─ InputField.tsx
│  │  │  ├─ Login
│  │  │  │  └─ LoginForm.tsx
│  │  │  ├─ RadioField.tsx
│  │  │  └─ Signup
│  │  │     └─ SignupForm.tsx
│  │  └─ Videos
│  │     └─ VideosPage.tsx
│  ├─ react-app-env.d.ts
│  ├─ services
│  │  ├─ customAxios.ts
│  │  ├─ dashboardApi.ts
│  │  ├─ guildApi.ts
│  │  ├─ readApi.ts
│  │  ├─ studyApi.ts
│  │  ├─ userApi.ts
│  │  ├─ videoApi.ts
│  │  └─ writeApi.ts
│  ├─ setupTests.ts
│  ├─ styles
│  │  ├─ Common
│  │  │  ├─ CommonBtnStyle.tsx
│  │  │  ├─ CommonDivStyle.tsx
│  │  │  ├─ EtcStyle.tsx
│  │  │  ├─ LoadingSpinner.tsx
│  │  │  └─ VideoModalStyle.tsx
│  │  ├─ DashBoard
│  │  │  └─ DashBoardStyle.ts
│  │  ├─ Guild
│  │  │  ├─ GuildEozStyle.ts
│  │  │  ├─ GuildMainStyle.ts
│  │  │  ├─ MasterSetting.ts
│  │  │  └─ MyGuildStyle.ts
│  │  ├─ Layout
│  │  │  ├─ HeaderStyle.ts
│  │  │  ├─ MainHeaderStyle.ts
│  │  │  └─ SideBarStyle.ts
│  │  ├─ Main
│  │  │  ├─ MainSearchStyle.ts
│  │  │  ├─ MainStyle.ts
│  │  │  ├─ RecentVideoStyle.ts
│  │  │  ├─ TagModalStyle.ts
│  │  │  └─ VideoModalStyle.ts
│  │  ├─ Read
│  │  │  └─ ReadStyle.ts
│  │  ├─ Speaking
│  │  │  └─ SpeakingStyle.ts
│  │  ├─ User
│  │  │  └─ UserStyle.ts
│  │  └─ Writing
│  │     └─ WritingStyle.ts
│  └─ utils
│     ├─ date.tsx
│     ├─ GradientInput.tsx
│     ├─ hooks.ts
│     ├─ moment.tsx
│     ├─ ToastMessage.tsx
│     ├─ ToolTip.tsx
│     ├─ useModal.tsx
│     ├─ useSideScroll.ts
│     └─ VideoModal.tsx
├─ tsconfig.json
└─ yarn.lock

```