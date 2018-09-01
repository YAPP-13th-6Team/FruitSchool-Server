# FruitSchool_Server
YAPP 13기 6팀 서버 개발


 ## FruitSchool_Server API 
 
 ### index

- 도감
  - 도감 목록
  - 도감 상세정보 

- 커뮤니티
  - 게시글 상세정보
  - 게시글 등록 
  - 게시글 수정 
  - 게시글 삭제
  - 댓글 등록 
  - 댓글 수정 
  - 댓글 삭제 
  
  
- 푸시 알람

/books -> 도감 카테고리 출력
/books/:category -> 도감 카테고리에 해당되는 도감 리스트 출력 (과일 이름, ...) 
/books/:id -> id에 해당하는 도감 상세내용 보기

/posts/list  -> 기본 날짜시간 정렬된 게시글 리스트(가장 최근의 게시글 리스트 반환) 
/posts/:id  -> 게시글 하나 클릭하면 게시글 상세 내용 보기 
/posts/     -> 등록 
/posts/     -> 삭제 
/posts/     -> 수정 
