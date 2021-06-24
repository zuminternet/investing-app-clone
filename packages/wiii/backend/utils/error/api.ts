/**
 * 커스텀 에러
 */
export class ApiError extends Error {
  public date: string;
  /**
   *
   * @param message 에러 메시지, 함수 기능 관련 ex. `이메일 중복 체크 실패`
   * @param name 에러 이름, 에러 발생 함수 위치, 원래는 ValidationError, RangeError 등 에러 발생 원인 기재 ex. `[DB:Repo:User]`
   */
  constructor(message: string, name: string) {
    super(message);
    this.message = message;
    this.name = name;
    this.date = new Date().toLocaleDateString();
  }
}

export class RepoError extends ApiError {
  constructor(message, repoName) {
    super(message, `****DB:Repo`);
    this.name = this.name + `:${repoName}: `;
  }
}
