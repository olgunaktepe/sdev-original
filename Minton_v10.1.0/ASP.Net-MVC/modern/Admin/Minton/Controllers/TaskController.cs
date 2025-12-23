using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class TaskController : Controller
    {
        public IActionResult List() => View();
        public IActionResult Kanban() => View();
        public IActionResult Details() => View();
    }
}