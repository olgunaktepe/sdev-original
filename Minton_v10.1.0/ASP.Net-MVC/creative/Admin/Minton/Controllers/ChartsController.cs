using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class ChartsController : Controller
    {
        public IActionResult C3() => View();
        public IActionResult Chartist() => View();
        public IActionResult Chartjs() => View();
        public IActionResult Sparklines() => View();
        public IActionResult Knob() => View();
        public IActionResult Apex() => View();
        public IActionResult Flot() => View();
        public IActionResult Morris() => View();
        public IActionResult Peity() => View();
    }
}