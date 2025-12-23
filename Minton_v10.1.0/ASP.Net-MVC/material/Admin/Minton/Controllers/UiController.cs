using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class UiController : Controller
    {
        public IActionResult Placeholders() => View();
        public IActionResult Avatars() => View();
        public IActionResult Dropdowns() => View();
        public IActionResult Buttons() => View();
        public IActionResult Cards() => View();
        public IActionResult ListGroup() => View();
        public IActionResult Carousel() => View();
        public IActionResult Spinners() => View();
        public IActionResult Progress() => View();
        public IActionResult Notifications() => View();
        public IActionResult Ribbons() => View();
        public IActionResult Tooltips() => View();
        public IActionResult Portlets() => View();
        public IActionResult Offcanvas() => View();
        public IActionResult Images() => View();
        public IActionResult Modals() => View();
        public IActionResult Video() => View();
        public IActionResult Grid() => View();
        public IActionResult General() => View();
        public IActionResult Tabs() => View();
        public IActionResult Typography() => View();
    }
}