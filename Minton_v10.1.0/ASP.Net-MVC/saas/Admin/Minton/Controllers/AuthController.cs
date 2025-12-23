using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult RecoverPassword() => View();
        public IActionResult LockScreen() => View();
        public IActionResult LockScreen2() => View();
        public IActionResult Logout() => View();
        public IActionResult Login() => View();
        public IActionResult ConfirmMail2() => View();
        public IActionResult Logout2() => View();
        public IActionResult ConfirmMail() => View();
        public IActionResult Register() => View();
        public IActionResult Register2() => View();
        public IActionResult SigninSignup() => View();
        public IActionResult RecoverPassword2() => View();
        public IActionResult Login2() => View();
        public IActionResult SigninSignup2() => View();
    }
}