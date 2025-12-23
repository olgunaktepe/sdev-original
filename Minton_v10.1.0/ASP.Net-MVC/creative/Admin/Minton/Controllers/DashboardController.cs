using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Analytics() => View();
        public IActionResult Index() => View();
        public IActionResult Crm() => View();
    }
}