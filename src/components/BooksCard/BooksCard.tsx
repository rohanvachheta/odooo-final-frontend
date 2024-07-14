

const BooksCard = props => {
  return (
    <div className="bg-gray-200 p-2   relative" onClick={()=>{
      props.setClickedBookId(props)
    }}>
          <a
            href="#"
            className="flex flex-col items-center 
            bg-white m-3 rounded-lg shadow md:flex-row 
            hover:bg-gray-100 dark:border-gray-700 

            dark:bg-boxdark dark:hover:bg-gray-700"

            style={{
              alignItems:'flex-start'
            }}
          >
            <img
              className="object-cover w-full rounded-t-lg h-36 md:h-auto md:w-28 sm:h-3 md:rounded-none -s-lg"
              src={props.image}
              alt=""
              style={{
                flexShrink: 0
              }}
            /> 

<span class=" absolute top-4 right-2 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Quantity: {props.quantity}</span>

            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               {props.name}
              </h5>

              <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
              {props.author} &#x2022;  {props.year} &#x2022;  {props.genre} 
              </p>

              
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {props.description }
              </p>

              
            </div>
          </a>
        </div>
        
  )
}

BooksCard.propTypes = {}

export default BooksCard