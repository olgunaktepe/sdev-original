using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class AppsController : Controller
    {
        public IActionResult Companies() => View();
        public IActionResult Chat() => View();
        public IActionResult FileManager() => View();
        public IActionResult Tickets() => View();
        public IActionResult Calendar() => View();
    }
}