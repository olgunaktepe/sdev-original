using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class TablesController : Controller
    {
        public IActionResult Datatables() => View();
        public IActionResult Tablesaw() => View();
        public IActionResult Editable() => View();
        public IActionResult Footables() => View();
        public IActionResult Basic() => View();
        public IActionResult Responsive() => View();
    }
}