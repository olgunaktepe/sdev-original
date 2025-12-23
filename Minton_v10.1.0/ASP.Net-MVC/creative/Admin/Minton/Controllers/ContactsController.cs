using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class ContactsController : Controller
    {
        public IActionResult List() => View();
        public IActionResult Profile() => View();
    }
}