using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class EmailController : Controller
    {
        public IActionResult Read() => View();
        public IActionResult Inbox() => View();
    }
}