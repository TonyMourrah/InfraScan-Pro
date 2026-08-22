using InfraScan.Data;
using InfraScan.Helpers;
using InfraScan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InfraScan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UtilisateursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UtilisateursController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("moi")]
        public async Task<IActionResult> GetMoi()
        {
            var username = User.Identity?.Name;
            var user = await _context.Utilisateurs.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) return NotFound();

            return Ok(new { user.Username, user.Email, user.Role });
        }

        [HttpPut("moi/mot-de-passe")]
        public async Task<IActionResult> ChangerMotDePasse(ChangerMotDePasseDto dto)
        {
            var username = User.Identity?.Name;
            var user = await _context.Utilisateurs.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) return NotFound();

            if (!BCrypt.Net.BCrypt.Verify(dto.AncienMotDePasse, user.PasswordHash))
            {
                return BadRequest(new { message = "Le mot de passe actuel est incorrect." });
            }

            var erreur = MotDePasseValidator.Valider(dto.NouveauMotDePasse);
            if (erreur != null)
            {
                return BadRequest(new { message = erreur });
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NouveauMotDePasse);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Mot de passe modifié avec succès." });
        }
    }
}