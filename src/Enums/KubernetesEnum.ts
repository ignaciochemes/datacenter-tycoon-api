/**
 * Enum para los estados de los clusters de Kubernetes
 * Basado en los requerimientos del documento de diseño
 */
export enum ClusterStatus {
    CREATING = 'creating',
    ACTIVE = 'active',
    UPDATING = 'updating',
    DELETING = 'deleting',
    FAILED = 'failed',
    MAINTENANCE = 'maintenance'
}

/**
 * Enum para los estados de los nodos
 */
export enum NodeStatus {
    READY = 'ready',
    NOT_READY = 'not_ready',
    UNKNOWN = 'unknown',
    SCHEDULING_DISABLED = 'scheduling_disabled'
}

/**
 * Enum para los estados de los pods
 */
export enum PodStatus {
    PENDING = 'pending',
    RUNNING = 'running',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
    UNKNOWN = 'unknown'
}

/**
 * Enum para los tipos de recursos de Kubernetes
 */
export enum KubernetesResourceType {
    POD = 'pod',
    DEPLOYMENT = 'deployment',
    SERVICE = 'service',
    INGRESS = 'ingress',
    CONFIGMAP = 'configmap',
    SECRET = 'secret',
    PERSISTENT_VOLUME = 'persistent_volume',
    PERSISTENT_VOLUME_CLAIM = 'persistent_volume_claim'
}

/**
 * Enum para las políticas de reinicio de pods
 */
export enum RestartPolicy {
    ALWAYS = 'Always',
    ON_FAILURE = 'OnFailure',
    NEVER = 'Never'
}

/**
 * Enum para las políticas de descarga de imágenes
 */
export enum PullPolicy {
    ALWAYS = 'Always',
    IF_NOT_PRESENT = 'IfNotPresent',
    NEVER = 'Never'
}