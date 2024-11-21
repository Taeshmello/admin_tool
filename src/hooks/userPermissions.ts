// hooks/usePermissions.ts
import { useAtom } from 'jotai';
import { permissionsAtom } from "../atoms/user";
import { userPermissions } from "../utils/api";
import { Permission } from "../atoms/user";

export const usePermissions = (userId: number | null) => {
    const [permissions, setPermissions] = useAtom(permissionsAtom);

    const loadPermissions = async () => {
        if (!userId) return;
        try {
            const permissionsList: { permissions: string; id?: number }[] = await userPermissions();
            const permissionsWithId: Permission[] = permissionsList.map((perm, index) => ({
                permissions: perm.permissions,
                id: index + 1,
            }));
            setPermissions(permissionsWithId);
        } catch (error) {
            console.error('권한 목록을 불러오는 데 실패했습니다:', error);
        }
    };

    return { permissions, loadPermissions };
};
