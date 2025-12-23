using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class MapsController : Controller
    {
        public IActionResult Vector() => View();
        public IActionResult Google() => View();
        public IActionResult Mapael() => View();
    }
}