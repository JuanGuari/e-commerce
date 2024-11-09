using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class EventOrderEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int OrderId { get; set; }
        [Required]
        public required string PreviousState { get; set; }
        [Required]
        public required string CurrentState { get; set; }
        [Required]
        public DateTime EventDate { get; set; }
        public required virtual OrderEntity Order { get; set; }
    }
}
