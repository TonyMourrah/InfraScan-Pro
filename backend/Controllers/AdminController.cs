using InfraScan.Data;
using InfraScan.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InfraScan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalActifs = await _context.Actifs.CountAsync();
            var totalUtilisateurs = await _context.Utilisateurs.CountAsync();
            var santeMoyenne = totalActifs > 0 ? await _context.Actifs.AverageAsync(a => a.EtatSante) : 0;
            var urgences = await _context.Actifs.CountAsync(a => a.EtatSante < 40);
            var totalModifications = await _context.ActifHistoriques.CountAsync();

            var repartitionRoles = await _context.Utilisateurs
                .GroupBy(u => u.Role)
                .Select(g => new { Role = g.Key, Nombre = g.Count() })
                .ToListAsync();

            return Ok(new
            {
                TotalActifs = totalActifs,
                TotalUtilisateurs = totalUtilisateurs,
                SanteMoyenne = Math.Round(santeMoyenne, 1),
                Urgences = urgences,
                TotalModifications = totalModifications,
                RepartitionRoles = repartitionRoles
            });
        }

     
        [HttpGet("utilisateurs")]
        public async Task<IActionResult> GetUtilisateursPourGestion()
        {
            var utilisateurs = await _context.Utilisateurs
                .Select(u => new { u.Id, u.Username, u.Role })
                .ToListAsync();

            return Ok(utilisateurs);
        }

        [HttpPut("utilisateurs/{id}/role")]
        public async Task<IActionResult> ChangerRole(int id, ChangerRoleDto dto)
        {
            var user = await _context.Utilisateurs.FindAsync(id);
            if (user == null) return NotFound();

            var rolesValides = new[] { "Admin", "Inspecteur" };
            if (!rolesValides.Contains(dto.NouveauRole))
            {
                return BadRequest(new { message = "Rôle invalide." });
            }

            user.Role = dto.NouveauRole;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Rôle mis à jour." });
        }
    }
}