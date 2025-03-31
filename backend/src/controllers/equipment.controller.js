import Equipment from "../models/equipment.model.js"

export const addEquipment = async(req,res)=>{
    try {
        const {name,category,availability,quantity,condition} = req.body
    
        if(!name||!category||!availability||!quantity||!condition) return res.status(400).json({message:"All fields are required"})
        
        const equipment = await Equipment.findOne({name})
        if(equipment) return res.status(400).json({message:"Equipment entry already exist"}) 
        
        const newEquipment = new Equipment({
            name,
            condition,
            category,
            availability,
            quantity,
            availableQuantity:quantity,
            issuedTo:[]
        })
    
        if(newEquipment){
            await newEquipment.save();
            return res.status(200).json({
                name:newEquipment.name,
                quantity : newEquipment.quantity,
                availableQuantity: newEquipment.quantity,
                condition:newEquipment.condition,
                availability:newEquipment.availability,
                category:newEquipment.category,
                issuedTo:newEquipment.issuedTo
            })
        }
        else{
            return res.status(400).json({message:"Invalid data "})
        }
    } catch (error) {
        console.log("Error in addEquipment",error.message);
        res.status(500).json("Internal server error")
        
    }

}
export const updateEquipment=async(req,res)=>{
    try {
        const {name,availability,quantity,condition} = req.body
        if(!name) return res.status(400).json({message:"Name not provided"})
        if(!availability && !quantity && !condition) return res.status(400).json({message:"No field is being updated"})
        
        const equipmentToUpdate = await Equipment.findOne({name});
        if(!equipmentToUpdate) return res.status(400).json({message:"Equipment doesnt exist"});

        
        if(availability) equipmentToUpdate.availability = availability
        if(quantity) {
            const oldQuantity = equipmentToUpdate.quantity;
            const diff = quantity - oldQuantity;
            equipmentToUpdate.quantity = quantity;
            equipmentToUpdate.availableQuantity= equipmentToUpdate.availableQuantity+diff;
        }
        if(condition) equipmentToUpdate.condition = condition

        await equipmentToUpdate.save();

        return res.status(200).json({message:"Equipment updated successfully"});
        
    } catch (error) {
        console.log("Error in updateEquipment",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const getEquipments=async(req,res)=>{
    try {
        const equipments = await Equipment.find();
        res.status(200).json(equipments)
    } catch (error) {
        console.log("Error in getEquipments",error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}
export const deleteEquipment = async (req, res) => {
    try {
      const { id } = req.params;  // Get ID from URL params
      const deletedEquipment = await Equipment.findByIdAndDelete(id);
  
      if (!deletedEquipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }
  
      res.status(200).json({ message: "Equipment deleted successfully" });
    } catch (error) {
      console.error("Error deleting equipment:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
