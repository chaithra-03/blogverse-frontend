import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogContainer from "./ui_components/BlogContainer";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import NavBar from "./ui_components/NavBar";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import SignupPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getUsername } from "./services/apiBlog";
import NotFoundPage from "./pages/NotFoundPage";





const App = () => {

  const [username, setUsername] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const {data} = useQuery({
    queryKey : ['username'],
    queryFn: getUsername
  })

  useEffect(function(){
    if(data){
      setUsername(data.username)
      setIsAuthenticated(true)
    }
  },[data])


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout 
        isAuthenticated = {isAuthenticated}
        username = {username} 
        setUsername = {setUsername}
        setIsAuthenticated = {setIsAuthenticated}/>}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="blogs/:slug" element={<DetailPage username = {username} isAuthenticated = {isAuthenticated} />} />
          <Route path="profile/:username" element={<ProfilePage authUsername = {username} />} />
          <Route path='signup' element={<SignupPage />} /> 
          <Route path="create" element={<ProtectedRoute><CreatePostPage isAuthenticated = {isAuthenticated} /></ProtectedRoute>} />
          <Route path='signin' element = {<LoginPage 
          setIsAuthenticated = {setIsAuthenticated}
          setUsername = {setUsername}/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
};

export default App;