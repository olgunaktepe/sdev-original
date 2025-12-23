using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class FormsController : Controller
    {
        public IActionResult Quilljs() => View();
        public IActionResult Validation() => View();
        public IActionResult Advanced() => View();
        public IActionResult FileUploads() => View();
        public IActionResult Wizard() => View();
        public IActionResult Elements() => View();
        public IActionResult XEditable() => View();
        public IActionResult Masks() => View();
        public IActionResult Pickers() => View();
    }
}