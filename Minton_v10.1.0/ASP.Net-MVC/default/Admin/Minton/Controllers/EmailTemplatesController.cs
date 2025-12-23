using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class EmailTemplatesController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Alert() => View();
        public IActionResult Billing() => View();
        public IActionResult Action() => View();
    }
}