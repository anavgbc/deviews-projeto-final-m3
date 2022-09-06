import { useContext } from "react";
import { PostContext, PostsData } from "../../providers/PostContext";
import ButtonFire from "../ButtonFire";
import { Container } from "./style";

const Post = ({ content, img, date, userInfo, fires, id }: PostsData) => {
  const loggedId = localStorage.getItem("@deviews:id");

  const { newFirePost, deleteFire } = useContext(PostContext);

  const isFire = fires.findIndex((elem) => {
    return elem.userId === Number(loggedId);
  });

  return (
    <Container>
      <div>
        <img src={userInfo.img} alt="imagem usuário" />
        <h2>{userInfo.name}</h2>
        <p>{`@${userInfo.username}`}</p>
      </div>
      <p className="content">{content}</p>
      {img && <img src={img} alt="imagem post" />}
      <div className="bottom_info">
        <span>{date}</span>
        <div>
          {isFire === -1 ? (
            <ButtonFire
              onClick={() => {
                const data = { userId: Number(loggedId), postId: id };
                newFirePost(data);
              }}
            />
          ) : (
            <ButtonFire
              onClick={() => {
                const teste2 = fires.find((elem) => {
                  return elem.userId === Number(loggedId);
                });

                const idFire = Number(teste2?.id);
                deleteFire(idFire);
              }}
            />
          )}

          {fires.length > 0 && <p>{fires.length}</p>}
        </div>
      </div>
    </Container>
  );
};
export default Post;
