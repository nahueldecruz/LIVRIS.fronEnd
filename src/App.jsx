import { Routes, Route, Navigate, Outlet } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx'
import AuthMiddleWare from './Middlewares/AuthMiddleWare/AuthMiddleWare.jsx'
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen.jsx'
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen/ForgotPasswordScreen.jsx'
import VerifiedEmailScreen from './Screens/VerifiedEmailScreen/VerifiedEmailScreen.jsx'
import MainLayout from './Layouts/MainLayout/MainLayout.jsx'
import AuthLayout from './Layouts/AuthLayout.jsx'
import ExploreBooksScreen from './Screens/ExploreBooksScreen/ExploreBooksScreen.jsx'
import BookDetailScreen from './Screens/BookDetailScreen/BookDetailScreen.jsx'
import { BooksContextProvider } from './Contexts/BooksContext.jsx'
import { ReviewsContextProvider } from './Contexts/ReviewsContext.jsx'
import { UsersContextProvider } from './Contexts/UserContext.jsx'
import UserProfileLayout from './Layouts/UserProfileLayout/UserProfileLayout.jsx'
import ReviewsListComponent from './Components/ReviewsListComponent/ReviewsListComponent.jsx'
import CommunityScreen from './Screens/CommunityScreen/CommunityScreen.jsx'
import InDevelopmentComponent from './Components/InDevelopmentComponent/InDevelopmentComponent.jsx'
import ListsBooksScreen from './Screens/ListsBooksScreen/ListsBooksScreen.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route element={<MainLayout />}>
          <Route element={<AuthMiddleWare />}>

            <Route element={<UsersContextProvider> <Outlet /> </UsersContextProvider>}>

              <Route element={ <BooksContextProvider> <Outlet /> </BooksContextProvider> }>
                <Route path="/books" element={<ExploreBooksScreen />} />
                <Route path="/community" element={<CommunityScreen />} />
                
                <Route element={ <ReviewsContextProvider> <Outlet/> </ReviewsContextProvider>}>
                  <Route path="/book-detail/:book_id" element={<BookDetailScreen />} />

                  <Route path="/user-detail/:user_id" element={<UserProfileLayout />}>
                    <Route path="reviews" element={<ReviewsListComponent />}/>
                    <Route path="comments" element={<InDevelopmentComponent />}/>
                    <Route path="lists-books" element={<ListsBooksScreen />}>
                      <Route path=":status" element={<InDevelopmentComponent />}/>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset-password/:reset-token" element={<ResetPasswordScreen />} />
          <Route path="/verified-email" element={<VerifiedEmailScreen />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
