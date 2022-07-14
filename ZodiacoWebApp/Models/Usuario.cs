using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZodiacoWebApp.Models
{
    public class Usuario
    {
        [Key]
        public int idUsuario { get; set; }
       public string nombre { get; set; }
        public string apeMaterno { get; set; }
        public string apePaterno { get; set; }
        public string email { get; set; }

        public int  cuestionarioId{ get;set; }

    }
}
