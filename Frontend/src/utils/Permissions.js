export default function UserHasPermission(permissions, requiredPermission) {
  if (!Array.isArray(permissions)) {
    return false; // Return false if permissions is not an array
  }
  for (const permission of permissions) {
    if (permission.slug === requiredPermission) {
      return permission;
    }
  }
  return null; // Return null if the permission is not found
}
