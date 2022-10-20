import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Main
import MainPage from './pages/Main/MainPage';
import VideosPage from './pages/Videos/VideosPage';
// Layout
import StudyLayout from './layout/StudyLayout';

// Auth
import LoginPage from './pages/User/Login/LoginPage';
import Signup from './pages/User/Signup/Signup';

// Study
import ReadPage from './pages/Study/Read/ReadPage';
import WritingPage from './pages/Study/Writing/WritingPage';
import SpeakingPage from './pages/Study/Speaking/SpeakingPage';
import VocaPage from './pages/Study/Voca/VocaPage';

// Dashboard
import CustomSetting from './pages/Dashboard/CustomSetting/CustomSetting';
import Profile from './pages/Dashboard/Profile/Profile';
import Statistics from './pages/Dashboard/Statistics/Statistics';
import StudyLog from './pages/Dashboard/StudyLog/StudyLog';
// pageNotFound
import PageNotFound from './layout/PageNotFound';

import Counter from './pages/Counter/Counter';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Main */}
        <Route path="" element={<MainPage />}></Route>
        <Route path="videos" element={<VideosPage />}></Route>

        {/* Auth */}
        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="" element={<PageNotFound />} />
          {/* 뒤에 라우트 주소가 비었을때도 NotFound로 갈 수 있게끔*/}
        </Route>
        <Route path="study" element={<StudyLayout />}>
          <Route path="read" element={<ReadPage />} />
          <Route path="voca" element={<VocaPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="speaking" element={<SpeakingPage />} />
          <Route path="" element={<PageNotFound />} />
        </Route>
        <Route path="dashboard">
          <Route path="profile" element={<Profile />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="customsetting" element={<CustomSetting />} />
          <Route path="studylog" element={<StudyLog />} />
          <Route path="" element={<PageNotFound />} />
        </Route>
        {/* Not Found */}
        <Route path="*" element={<PageNotFound />}></Route>
        {/* Dummy */}
        <Route path="dummy" element={<Counter />}></Route>
      </Routes>
    </div>
  );
}

export default App;
