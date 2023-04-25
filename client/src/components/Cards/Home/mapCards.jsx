import HomeCards from "./HomeCards"


export default function MapCards({recipes}){
    return(
        <>
        {recipes.map(({id, title,image,dietTypes}) => {
            
        return (
          <HomeCards
          key={id}
          id ={id}
          image={image}
          title={title}
          dietTypes={dietTypes}
          
        />
        );
      })}</>
    )

}