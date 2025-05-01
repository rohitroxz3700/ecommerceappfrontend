import Essentials from "./Essentials"

import DiscountedFirst from "./DiscountedFirst"
import FitnessEssentials from "./FitnessEssentials"
import DiscountedSecond from "./DiscountedSecond"
import DiscountedThird from "./DiscountedThird"
function Home() {
    return (
        <div>
            <Essentials/>
            <DiscountedFirst/>

            <div className="flex">
                <FitnessEssentials/>
                <DiscountedSecond/>
            </div>
            
            <DiscountedThird/>  
        </div>
    )
}

export default Home