import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './utils/hooks';
import { authActions } from './features/auth/authSlice';
// Main
import MainPage from './pages/Main/MainPage';
import VideosPage from './pages/Videos/VideosPage';
// Layout
import StudyLayout from './layout/StudyLayout';
import MainLayout from './layout/MainLayout';

// Auth
import AuthPage from './pages/User/Auth/AuthPage';
// Study
import ReadPage from './pages/Study/Read/ReadPage';
import WritingPage from './pages/Study/Writing/WritingPage';
import SpeakingPage from './pages/Study/Speaking/SpeakingPage';
import VocaPage from './pages/Study/Voca/VocaPage';

// Dashboard
import DashBoardPage from './pages/Dashboard/DashBoardPage';

// Guild 
import GuildPage from './pages/Guild/GuildPage';

// pageNotFound
import PageNotFound from './layout/PageNotFound';

// Private
import { ProtectedRoute } from './pages/private/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Main */}
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<MainLayout />}>
            <Route path="" element={<MainPage />} />
            <Route path="videos" element={<VideosPage />} />
            {/* <Route path="" element={<MainPage />} /> */}
            {/* 뒤에 라우트 주소가 비었을 때에도 무조건 메인으로 */}
          </Route>
        </Route>

        {/* Auth */}
        <Route path="auth">
          <Route path="login" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard/:pageNum" element={<DashBoardPage />} />
            <Route path="guild/:guildPageNum" element={<GuildPage  />} />
            <Route path="" element={<PageNotFound />} />
            {/* 뒤에 라우트 주소가 비었을때도 NotFound로 갈 수 있게끔*/}
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="study" element={<StudyLayout />}>
            <Route
              path="reading/:learningRecordId/:stage/:videoId"
              element={<ReadPage />}
            />
            <Route path="voca" element={<VocaPage />} />
            <Route
              path="writing/:learningRecordId/:stage/:videoId"
              element={<WritingPage />}
            />
            <Route
              path="speaking/:learningRecordId/:stage/:videoId"
              element={<SpeakingPage />}
            />
            <Route path="" element={<PageNotFound />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
