import AppRouter from "~/routes/AppRouter";
import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";
import "~/assets/styles/global.css";
import "~/assets/styles/homeStyle.css"
import "~/assets/styles/contact.css"
import "~/assets/styles/stickyMenu.css"
import "~/assets/styles/about.css"
import "~/assets/styles/medical.css"
import "~/assets/styles/blogDetail.css"
import "~/assets/styles/service.css"
import "~/assets/styles/recruitment.css";
import { AuthProvider } from "~/services/auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 d-flex flex-column">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
