import { useEffect, useState } from "react";
import { Group } from "@/domain/group";
import { apiFetch } from "@/lib/apiFetch";

export function useGroupInfo(id: string | string[] | undefined) {
  const [groupName, setGroupName] = useState<string>("");
  const [userNameList, setUserNameList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === "string") {
      localStorage.setItem("groupId", id);

      apiFetch<Group>(`/group/getInfo?groupUuId=${id}`, {
        method: "GET"
      })
        .then(data => {
          setGroupName(data.group_name);
          setUserNameList(data.Users.map(user => user.user_name));
        })
        .catch(error => console.error("Error fetching group data:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return { groupName, userNameList, loading };
}