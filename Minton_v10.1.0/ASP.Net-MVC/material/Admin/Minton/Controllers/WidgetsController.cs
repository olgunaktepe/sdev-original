using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class WidgetsController : Controller
    {
        public IActionResult Index() => View();
    }
}