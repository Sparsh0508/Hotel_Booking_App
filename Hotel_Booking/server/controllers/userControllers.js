
 // get /api/user/

export const getUserData = async(req,res)=>{
    try {
        const role = req.user.role;
        const recentSearchCity = req.user.recentSearchCity;
        res.json({
            success:true,
            role,
            recentSearchCity
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message})
    }
}

// store recent search cities

export const storeRecentSearchedCities = async(req,res) => {
    try {
        const {recentSearchCity} =req.body
        const user = req.user

        if(user.recentSearchCity.length < 3){
            user.recentSearchCity.push(recentSearchCity)
        }else{
            user.recentSearchCity.shift()
            user.recentSearchCity.push(recentSearchCity)
        }
        await user.save();
        res.json({
            success:true,
            message:"city Added"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
} 