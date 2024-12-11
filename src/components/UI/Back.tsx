import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export function Back() {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      className={"back"}
      shape="circle"
      icon={<ArrowLeftOutlined width={25} height={25} />}
      onClick={() => navigate("/")}
    />
  );
}
