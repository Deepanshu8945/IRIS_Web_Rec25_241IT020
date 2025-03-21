import Infrastructure from "../models/infrastructure.model.js"

export const createInfra = async(req,res)=>{
    try {
        const {name,location,availablity,capacity,operatingHours} = req.body
    
        if(!name||!location||(availablity === undefined ||availablity===null)||!capacity||!operatingHours) return res.status(400).json({message:"All fields are required"})
        
        const infrastructure = await Infrastructure.findOne({name})
        if(infrastructure) return res.status(400).json({message:"infrastructure entry already exist"}) 
        
        const newInfrastructure = new Infrastructure({
            name,
            location,
            availablity,
            capacity,
            operatingHours
        })
    
        if(newInfrastructure){
            await newInfrastructure.save();
            return res.status(200).json({
                name:newInfrastructure.name,
                location:newInfrastructure.location,
                availablity:newInfrastructure.availablity,
                capacity:newInfrastructure.capacity,
                operatingHours:newInfrastructure.operatingHours
            })
        }
        else{
            return res.status(400).json({message:"Invalid data "})
        }
    } catch (error) {
        console.log("Error in createInfra",error.message);
        res.status(500).json("Internal server error")
        
    }

}
export const updateInfra=async(req,res)=>{
    try {
        const {name,availablity,capacity,operatingHours,location} = req.body
        if(!name) return res.status(400).json({message:"Name not provided"})
        
        if((availablity === undefined ||availablity===null) && !capacity && !operatingHours && !location) return res.status(400).json({message:"No field is being updated"})
        
        const infraToUpdate = await Infrastructure.findOne({name});
        if(!infraToUpdate) return res.status(400).json({message:"Infrastructure doesnt exist"});

        
        if(availablity !== undefined && availablity!==null) infraToUpdate.availablity = availablity
        if(capacity) {
            infraToUpdate.capacity = capacity;
        }
        if(location) infraToUpdate.location = location
        if(operatingHours) infraToUpdate.operatingHours = operatingHours;

        await infraToUpdate.save();

        return res.status(200).json({message:"Infra updated successfully"});
        
    } catch (error) {
        console.log("Error in updateInfra",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const getInfra=async(req,res)=>{
    try {
        const infrastructure = await Infrastructure.find();
        res.status(200).json(infrastructure)
    } catch (error) {
        console.log("Error in getInfra",error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}
