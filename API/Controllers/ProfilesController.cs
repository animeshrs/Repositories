using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProfileDetails = Application.Profiles.Details;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new ProfileDetails.Query { Username = username }));
        }

    }
}