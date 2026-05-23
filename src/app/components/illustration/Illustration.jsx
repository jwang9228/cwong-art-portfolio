export default function Illustration() {
  return (
    // TODO: gradient here?
    <div className='flex flex-col bg-white gap-y-4 px-6 pt-24 pb-8'>
      <img 
        src={`/illustration/xiao.jpg`}
        loading='lazy' 
        alt='' />
      <img 
        src={`/illustration/furina.jpg`}
        loading='lazy' 
        alt='' />
      <img 
        src={`/illustration/xiaoven.jpg`}
        loading='lazy' 
        alt='' />
      <img 
        src={`/illustration/magical_girl_juno.jpg`}
        loading='lazy' 
        alt='' /> 
      <img 
        src={`/illustration/juno.jpg`}
        loading='lazy' 
        alt='' />
    </div>
  )
}