export default function Card(props) {
    const url = props.url;
    const title = props.title;
    const val = props.val;
    return (
        <div className="card_design my-[15px] text-[#afafaf]">
            <img className="img_size" src={url} alt="" />
            <div className="card_text">
                <h1 className="text-xs sm:text-lg px-[5px]">{title}</h1>
                <h1 className="text-xs sm:text-lg px-[5px]">{val}</h1>
            </div>
        </div>
    )
}