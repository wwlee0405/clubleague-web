import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from "./screens/Home";
import Match from "./screens/Match";
import Me from "./screens/Me";
import Profile from "./screens/Profile";
import PhotoTest from "./screens/PhotoTest";
import Outcluber from "./screens/Outcluber";
import Notification from "./screens/Notification";
import Clubhouse from "./screens/club/Clubhouse";
import ClubCalendar from "./screens/club/ClubCalendar";
import ClubMember from "./screens/club/ClubMember";
import ClubSetting from "./screens/club/ClubSetting";

import NewClub from "./screens/home/NewClub";
import CreateGame from "./screens/match/CreateGame";

import GameFeed from "./screens/match/GameFeed";
import Root from "./Root";
import ClubRoot from "./ClubRoot";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path= "/" element={<Root/>}>
        <Route index element={<Home />} />
        <Route path="match" element={<Match />} />


        <Route path="/:username" element={<Me />} />
        <Route path="/users/:username" element={<Profile />} />
        <Route path="photo" element={<PhotoTest />} />
        <Route path="outcluber" element={<Outcluber />} />
        <Route path="notification" element={<Notification />} />

        <Route path="create_club" element={<NewClub />} />
        <Route path="create_game" element={<CreateGame />} />

        
      </Route>
      <Route path= "/" element={<ClubRoot/>}>
        <Route path="club/:clubname" element={<Clubhouse />} />
        <Route path="club/:clubname/calendar" element={<ClubCalendar />} />
        <Route path="club/:clubname/member" element={<ClubMember />} />
        <Route path="club/:clubname/setting" element={<ClubSetting />} />
      </Route>
      <Route path="match/:id" element={<GameFeed />} />
    </Route>
  )
);


export default router;
