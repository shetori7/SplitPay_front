import { useEffect, useState } from "react";
import { Group } from "@/domain/group";
import { apiFetch } from "@/lib/apiFetch";

// WariFinalPayment型に合わせて定義
export type Payment = {
  final_payment_id: number;
  group_uuid: string;
  from_user_id: number;
  to_user_id: number;
  amount: number;
  from_user_name?: string; // 追加
  to_user_name?: string;   // 追加
};

export function useGroupInfo(id: string | string[] | undefined) {
  const [groupName, setGroupName] = useState<string>("");
  const [userNameList, setUserNameList] = useState<string[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === "string") {
      localStorage.setItem("groupId", id);

      apiFetch<Group & { Payments: Payment[] }>(`/group/getInfo?groupUuId=${id}`, {
        method: "GET"
      })
        .then(data => {
          setGroupName(data.group_name);
          setUserNameList(data.Users.map(user => user.user_name));

          // id→user_nameのマップを作成
          const idNameMap = Object.fromEntries(
            data.Users.map(user => [user.user_id, user.user_name])
          );

          // paymentsにuser名を付与して整形
          const paymentsWithNames = (data.Payments ?? []).map(p => ({
            ...p,
            from_user_name: idNameMap[p.from_user_id] ?? `ID:${p.from_user_id}`,
            to_user_name: idNameMap[p.to_user_id] ?? `ID:${p.to_user_id}`,
          }));

          setPayments(paymentsWithNames);
        })
        .catch(error => console.error("Error fetching group data:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return { groupName, userNameList, payments, loading };
}