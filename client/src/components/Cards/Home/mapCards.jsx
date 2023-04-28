import HomeCards from "./HomeCards"


export default function MapCards({recipes}){
    return(
        <>
        {recipes[0] && recipes.map(({id, title,image,dietTypes,healthScore}) => {
            
        return (
          <HomeCards
          key={id}
          id ={id}
          image={image}
          title={title}
          dietTypes={dietTypes}
          healthScore={healthScore}
          
        />
        );
      })}</>
    )

}