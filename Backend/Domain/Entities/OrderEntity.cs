using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class OrderEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [ForeignKey("UserEntity")]
        public int UserId { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public DateTime EstimatedDeliveryDate { get; set; }

        public virtual UserEntity UserEntity { get; set; }
        public virtual ICollection<EventOrderEntity>? EventOrders { get; set; }
        public virtual ICollection<OrderProductEntity>? OrderProducts { get; set; }
    }
}
