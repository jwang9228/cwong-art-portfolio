import { EMAIL } from '../lib/constants';

export default function Page() {
  return (
    <div className='flex flex-col'>
      <h1>Hello!</h1>
      <p>
        My name is Courtney Wong and I am an illustrator and character designer. 
      </p>
      <p>
      </p>
        I became an artist because I love telling stories with my art and my characters. My hopes as an artist is to convey this to others, that the people looking at my art will feel the same emotions as I do. 
        When I'm not huddled up at my desk drawing, you'll probably find me baking, cooking or playing video games.
      <p>
        I'd love to connect! Feel free to contact me at {EMAIL}
      </p>
    </div>
  )
}